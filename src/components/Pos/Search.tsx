
import SearchIcon from '../Icons/SearchIcon';

export interface SearchProps {
    search: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ search, placeholder, onChange }: SearchProps) => {
    return (
        <div className="relative h-full">
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={onChange}
                className="text-[14px] placeholder:text-grey rounded-md w-full h-full  pl-10 pr-4 py-[5px] border focus:ring-grey focus:border-grey border-grey"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
            </div>
        </div>
    );
}

export default Search;
