import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { fetchReviews } from '../../redux/reviewsSlice';
import { getCookie } from '../../utilis/getCookie';

export default function AddReviews() {
    const [loading, setLoading] = useState(false);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(1);
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const dispatch = useDispatch();
    const token = getCookie("token")

    const handleAddReviews = async (e) => {
        e.preventDefault();

        const review = e.target.review.value;
        if (!review) {
            toast.error("Please write some comments")
            return
        }
        // console.log(defaultRating, review, id)
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:3000/api/user/review-doctor/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: review,
                    rating: defaultRating,
                    userId: user._id,
                    userName: user.username,
                    image: user.image,
                })
            })
            const data = await res.json();
            console.log(data)
            if (res.ok) {
                toast.success(data.message)
                dispatch(fetchReviews(id))
                e.target.reset()
                setLoading(false)
            } else {
                toast.error(data.message)
                setLoading(false)
            }
        }
        catch (err) {
            toast.error(err.message)
        }


    }
    return (
        <div className="">
            <h5 className='fw-bolder'>Add Reviews</h5>
            {/* <p>{ratingMsg[Math.floor(defaultRating) - 1]}</p> */}
            <p className='fs-3 fw-bold'>{defaultRating + `/` + maxRating.length}</p>
            <div className="">
                {
                    maxRating.map((rate, index) => {
                        return (
                            <label key={index} className='text-3xl cursor-pointer ' onClick={() => setDefaultRating(rate)}>
                                {rate <= defaultRating ? <i className='bi bi-star-fill text-warning fs-3 '></i> : rate - 0.5 <= defaultRating ? <i className='bi bi-star-half text-warning fs-3'></i> : <i className='bi bi-star text-warning fs-3'></i>}
                            </label>
                        )
                    })
                }

            </div>
            <input type="range" min="1" max="5" step="0.5" className='w-full' value={defaultRating} onChange={(e) => setDefaultRating(e.target.value)} />
            <form onSubmit={handleAddReviews} >
                <div className="mb-3">
                    <label for="review" className="form-label">Comments</label>
                    <textarea className="form-control" id="review" rows="3" placeholder="Type Your Comments"></textarea>
                </div>
                <button type="submit" className="btn text-white w-100 text-capitalize  " style={{ backgroundImage: 'linear-gradient(to right, #fc6076, #ff9a44)' }}>
                    {
                        loading ? (
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : "Add Review"
                    }
                </button>
            </form>
        </div>
    )
}
