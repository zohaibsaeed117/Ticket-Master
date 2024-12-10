import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      // modules={{ toolbar: false }} // Disable toolbar
      theme="snow" // Still uses "snow" theme for styling
    />
  );
};

export default RichTextEditor;
