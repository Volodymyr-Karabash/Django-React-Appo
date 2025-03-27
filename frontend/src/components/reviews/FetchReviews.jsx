import { timeAgo } from "../../utilis/timeAgo";


export default function FetchReviews({ review }) {
    // console.log(review)
    return (
        <div className="review">
            <hr />
            <div className="d-flex gap-3 align-items-center  ">
                <div className="user">
                    <img width={50} height={50} className='rounded-circle ' src={`http://localhost:3000/${review.image}`} alt="User" />
                </div>
                <div className="">
                    <div className="rating">
                        {
                            // fetch Reviews rating star , star-fill and star-half icons from bootstrap icons library
                           Array.from({ length: 5 }, (_, index) => {
                            let number = index + 0.5;
                                return (
                                    <label key={index} className='text-3xl cursor-pointer '>
                                        {
                                            review.rating >= index + 1 ? (
                                                <i className='bi bi-star-fill text-warning  '></i>
                                            ) : review.rating  >= number ? (
                                                <i className='bi bi-star-half text-warning '></i>
                                            ) : (
                                                <i className='bi bi-star text-warning '></i>
                                            )
                                        }
                                    </label>
                                )
                            })
                        
                        }
                         ( {review.rating} { review.rating > 1 ? 'Stars' : 'Star'})
                        {/* <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i> */}
                    </div>
                    <h6 className='fw-bolder'>
                        {review.userName} - {timeAgo(review.createdAt)}
                        {/* {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} */}
                    </h6>
                    <p> {review.text} </p>
                </div>
            </div>
        </div>
    )
}
