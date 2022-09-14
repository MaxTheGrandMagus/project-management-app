export const textareaThemes = {
  full: " h-full resize-none w-full z-20  bg-slate-500 font-bold  border-none focus: outline-slate-400 ",
  notFull: "max-h-min resize-none w-4/5 z-20 top-2 left-2 bg-slate-500 font-bold  border-none focus: outline-slate-400 "
}

interface TextareaProps {
  className?: string,
  name: string,
  id: string,
  value: string,
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({name, id, value, className, onChange}: TextareaProps) => {
  return (
    <textarea 
      name={name} 
      className={className}
      id={id} 
      onChange={onChange} 
      value={value} 
    >
    </textarea>
  )
}

export default Textarea
