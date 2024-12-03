import React from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";

const defaultConfig = {
  imageUpload: false,
  imageUploadToBase64: false,
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
  height: 300,
};

const SkinLeLeEditor = ({ model, onChange, config }) => {
  return (
    <FroalaEditor
      tag="textarea"
      config={{
        ...defaultConfig,
        ...config,
      }}
      model={model}
      onModelChange={onChange}
    />
  );
};

export default SkinLeLeEditor;
