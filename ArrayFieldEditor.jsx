import React from "react";
import { Plus, Trash2 } from "lucide-react";
import FileUploadField from "@/components/admin/FileUploadField";

export default function ArrayFieldEditor({ items = [], onChange, fields, itemLabel, addLabel = "Add Item" }) {
  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    onChange(newItems);
  };

  const addItem = () => {
    const newItem = {};
    fields.forEach((f) => { newItem[f.key] = f.default || ""; });
    onChange([...items, newItem]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-purple-500/10 bg-[#050507] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-400 font-mono text-sm">{itemLabel(item, index)}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-white/30 hover:text-red-400 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((field) => (
              <div key={field.key} className={field.full ? "sm:col-span-2" : ""}>
                <label className="text-white/40 text-xs mb-1 block">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    value={item[field.key] || ""}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a12] border border-purple-500/15 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={item[field.key] || ""}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a12] border border-purple-500/15 text-white text-sm focus:outline-none focus:border-purple-500/40 resize-none"
                  />
                ) : field.type === "file" || field.type === "image" ? (
                  <FileUploadField
                    value={item[field.key] || ""}
                    onChange={(url) => updateItem(index, field.key, url)}
                    type={field.type}
                  />
                ) : (
                  <input
                    value={item[field.key] || ""}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a12] border border-purple-500/15 text-white text-sm focus:outline-none focus:border-purple-500/40"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/5 transition-colors w-full justify-center"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}
