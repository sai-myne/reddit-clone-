import classNames from 'classnames';

interface InputGroupProps {
    className?: string
    type: string
    placeholder: string
    value: string
    error: string | undefined
    setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
    className,
    type,
    placeholder,
    value,
    error,
    setValue
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          "transition duration-200 px-3 py-2 w-full bg-gray-50 outline-none border border-gray-300 rounded focus:bg-white hover:bg-white",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup
