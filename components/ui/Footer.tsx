export default function Footer() {
    return (
        <footer className="flex justify-between bg-gray-900 border-t-2 border-gray-700">
            <p className="text-center p-4 text-gray-400">Client CRM Next - Copyright &copy; {new Date().getFullYear()}</p>
            <p className="text-center p-4 text-gray-400 text-sm">Developed by {' '}
                <a 
                    className="hover:text-gray-500 font-semibold transition-colors duration-200"
                    href="https://github.com/Thomas465xd" 
                    target="_blank" 
                    rel="noreferrer"
                >
                    Thomas Schrödinger
                </a>
            </p>
        </footer>
    )
}
