import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image","video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1
        className="text-centertext-3xl 
my-7 font-semibold"
      >
        Créer post
      </h1>
      <form className="flex flex-col gap-4">
        <div
          className="flex flex-col gap-4
  sm:flex-row justify-between"
        >
          <TextInput
            type="text"
            placeholder="Le Titre"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Selectioner une categorie</option>
            <option value="information">Information</option>
            <option value="projet">Les Projets</option>
            <option value="consil">Conseil</option>
            <option value="deplacement">Déplacement/Voyage</option>
            <option value="action">Les actions</option>
            <option value="autre">Autre</option>
          </Select>
        </div>
        <div
          className="flex gap-4 
 items-center justify-between
  border-4 border-teal-500 border-dotted p-3"
        >
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Charger une image
          </Button>
        </div>

        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Votre message ici"
          className="h-52 mb-12"
          required
        />
        <Button type="submit" gradientMonochrome="purpleToPink">
          Publier
        </Button>
      </form>
    </div>
  );
}
