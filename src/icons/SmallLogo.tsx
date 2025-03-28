export default function SmallLogo({ className }: { className: string }) {
    return (
        <div className={className}>
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="7.5" stroke="#F65F42" strokeWidth="7" />
            </svg>
        </div>
    );
}
