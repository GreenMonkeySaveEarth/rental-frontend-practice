interface InformationMessageProps {
    title: string;
    message: string;
}

function InformationMessage(props: InformationMessageProps) {
    const { title, message } = props;
    return (
        <div className="bg-blue-100 border w-full max-w-md border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
        </div>
    )
}

export default InformationMessage;