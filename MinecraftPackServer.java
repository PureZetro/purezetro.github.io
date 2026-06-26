import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.*;
import java.util.*;
import java.util.zip.*;

public class MinecraftPackServer {

    static String PACK_FOLDER = "pack/";
    static String ITEM_FOLDER = PACK_FOLDER + "assets/minecraft/textures/item/";
    static String MODEL_FOLDER = PACK_FOLDER + "assets/minecraft/models/item/";

    public static void main(String[] args) throws Exception {

        // Start HTTP server
        HttpServer server = HttpServer.create(new InetSocketAddress(3000), 0);

        // Endpoint: list items
        server.createContext("/items", new ItemsHandler());

        // Endpoint: upload pack (simple local test version)
        server.createContext("/upload", new UploadHandler());

        server.setExecutor(null);
        server.start();

        System.out.println("🚀 Server running on http://localhost:3000");
    }

    // ---------------- ITEM LIST API ----------------
    static class ItemsHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {

            List<String> items = new ArrayList<>();

            File folder = new File(ITEM_FOLDER);

            if (folder.exists()) {
                for (File f : folder.listFiles()) {
                    if (f.getName().endsWith(".png")) {

                        String name = f.getName().replace(".png", "");

                        items.add("{\"name\":\"" + name + "\"}");
                    }
                }
            }

            String response = "[" + String.join(",", items) + "]";

            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length());

            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    // ---------------- UPLOAD + UNZIP ----------------
    static class UploadHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {

            if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                String msg = "Use POST";
                exchange.sendResponseHeaders(400, msg.length());
                exchange.getResponseBody().write(msg.getBytes());
                exchange.close();
                return;
            }

            InputStream is = exchange.getRequestBody();
            File zipFile = new File("pack.zip");

            Files.copy(is, zipFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            unzip(zipFile.getPath(), PACK_FOLDER);

            String msg = "Pack uploaded + extracted ✔";

            exchange.sendResponseHeaders(200, msg.length());
            exchange.getResponseBody().write(msg.getBytes());
            exchange.close();

            System.out.println("📦 Pack extracted!");
        }
    }

    // ---------------- ZIP EXTRACTOR ----------------
    public static void unzip(String zipPath, String destDir) throws IOException {

        File dir = new File(destDir);
        if (!dir.exists()) dir.mkdirs();

        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipPath));
        ZipEntry entry;

        while ((entry = zipIn.getNextEntry()) != null) {

            File filePath = new File(destDir + entry.getName());

            if (entry.isDirectory()) {
                filePath.mkdirs();
            } else {
                filePath.getParentFile().mkdirs();

                FileOutputStream fos = new FileOutputStream(filePath);

                byte[] buffer = new byte[4096];
                int len;

                while ((len = zipIn.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }

                fos.close();
            }
        }

        zipIn.close();
    }
}
