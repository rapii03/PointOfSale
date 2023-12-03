export interface PlaceholderProps {
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Searchbar = ({placeholder, onChange}: PlaceholderProps) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} onChange={onChange} className="text-md rounded-md w-72 h-8 border focus:ring-[#FF6B35] focus:border-[#FF6B35] border-[#FF6B35]" />
        </div>
    )
}

export default Searchbar