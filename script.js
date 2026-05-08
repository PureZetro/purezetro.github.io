export default function BlockbenchConverter() {
  const example = `{
  "textures": {
    "0": "item/mace"
  },
  "elements": []
}`;

  const downloadProject = () => {
    const input = document.getElementById('jsonInput').value;

    try {
      const parsed = JSON.parse(input);

      const bbmodel = {
        meta: {
          format_version: '4.9',
          model_format: 'java_block'
        },
        name: 'Converted Model',
        resolution: {
          width: 64,
          height: 64
        },
        elements: parsed.elements || [],
        textures: [
          {
            path: 'mace.png',
            name: 'mace'
          }
        ],
        outliner: []
      };

      const blob = new Blob([
        JSON.stringify(bbmodel, null, 2)
      ], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'model.bbmodel';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Invalid JSON file');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-zinc-800 rounded-3xl shadow-2xl p-6">
        <h1 className="text-4xl font-bold mb-2">
          Blockbench Project Converter
        </h1>

        <p className="text-zinc-400 mb-6">
          Paste your Minecraft Java model JSON and export a .bbmodel project.
        </p>

        <textarea
          id="jsonInput"
          defaultValue={example}
          className="w-full h-96 bg-black rounded-2xl p-4 font-mono text-sm border border-zinc-700"
        />

        <button
          onClick={downloadProject}
          className="mt-6 px-6 py-3 bg-white text-black rounded-2xl font-bold hover:scale-105 transition"
        >
          Download .bbmodel
        </button>

        <div className="mt-8 text-zinc-400 text-sm">
          <p>How to use:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Paste your Java model JSON</li>
            <li>Click Download .bbmodel</li>
            <li>Open Blockbench</li>
            <li>File → Open Model</li>
            <li>Select the downloaded file</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
