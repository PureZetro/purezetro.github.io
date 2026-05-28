import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Phone, UserPlus, Send } from "lucide-react";

export default function SocialWebsite() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { user: "Alex", text: "Yo wanna play Minecraft later?" },
    { user: "Jay", text: "Sure lol" },
  ]);

  const friends = [
    "Alex",
    "Jay",
    "Luna",
    "Shadow",
  ];

  function login() {
    if (username.trim()) {
      setLoggedIn(true);
    }
  }

  function sendMessage() {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        user: username,
        text: message,
      },
    ]);

    setMessage("");
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold">FriendLink</h1>
              <p className="text-gray-500 mt-2">
                Chat, call, and hang out online.
              </p>
            </div>

            <Input
              placeholder="Create username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-2xl h-12 text-lg"
            />

            <Button
              onClick={login}
              className="w-full rounded-2xl h-12 text-lg"
            >
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-400">
              Starter social website UI
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-80 bg-white shadow-xl p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-14 w-14">
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-bold text-2xl">{username}</h2>
            <p className="text-green-500">● Online</p>
          </div>
        </div>

        <Button className="rounded-2xl mb-6 flex gap-2 items-center">
          <UserPlus size={18} />
          Add Friend
        </Button>

        <h3 className="font-bold text-xl mb-4">Friends</h3>

        <div className="space-y-3 overflow-auto">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-200 transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {friend.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold">{friend}</p>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="icon" className="rounded-xl">
                  <MessageCircle size={18} />
                </Button>

                <Button size="icon" className="rounded-xl">
                  <Phone size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">General Chat</h1>
            <p className="text-gray-500">Talk with friends</p>
          </div>

          <div className="flex gap-3">
            <Button className="rounded-2xl flex gap-2 items-center">
              <Phone size={18} />
              Start Call
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-br from-gray-100 to-gray-200">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 shadow-md max-w-xl"
            >
              <p className="font-bold text-purple-600">{msg.user}</p>
              <p className="mt-2 text-lg">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 flex gap-4 shadow-inner">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-2xl h-14 text-lg"
          />

          <Button
            onClick={sendMessage}
            className="rounded-2xl h-14 px-8"
          >
            <Send size={20} />
          </Button>
        </div>
      </main>
    </div>
  );
}
