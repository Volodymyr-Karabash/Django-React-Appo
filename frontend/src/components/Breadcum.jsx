import { Link } from 'react-router-dom'

export default function Breadcum({ title}) {
    return (
        <section className='py-5' style={{ background: "#fd4169" }}>
            <h2 className='fw-bold text-center text-white '>{title}</h2>
            {/* breadcum with arrow make all text-white */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center bg-transparent">
                    <li className="breadcrumb-item"><Link to="/" className="text-white">Home</Link></li>
                    <li className="breadcrumb-item active text-white" aria-current="page">{title}</li>
                </ol>
            </nav>
        </section>
    )
}
