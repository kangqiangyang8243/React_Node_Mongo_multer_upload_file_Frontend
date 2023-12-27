import axios from "axios";
import { useEffect, useState } from "react"
import './ListingPage.css'

function ListingPage() {

  const [allImages, setAllImages] = useState();
  const [allVideos, setAllVideos] = useState();
  const [allAudios, setAllAudios] = useState();
  const [cat, setCat] = useState("image");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios
					.get(import.meta.env.VITE_BASE_URL + "/upload/")
					.then((res) => {
						return res.data;
          });
        
        // console.log(res)

        const images = await res.allImages.filter(
					(item) =>
						item.contentType === "image/jpeg" ||
						item.contentType === "image/png" ||
						item.contentType === "image/svg"
        );
        
        // console.log("images",images)

        await setAllImages(images)

         const videos = await res.allImages.filter(
						(item) => item.contentType === "video/mp4"
					);

					// console.log("images",images)

        await setAllVideos(videos);
        
         const audios = await res.allImages.filter(
						(item) => item.contentType === "audio/mpeg"
					);

					// console.log("images",images)

					await setAllAudios(audios);
        
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchAll();
  }, [])
  
  // console.log("allImages", allImages);
  // console.log("allVideos", allVideos);
  // console.log("allAudios", allAudios);


  return (
		<div className="listing_container">
			<h3 className="listing_title">Listing Page</h3>

			<div className="listing_btns">
				<button
					className={`listing_btn ${cat === "image" ? "active" : ""}`}
					onClick={() => setCat("image")}>
					Images
				</button>
				<button
					className={`listing_btn ${cat === "video" ? "active" : ""}`}
					onClick={() => setCat("video")}>
					Videos
				</button>
				<button
					className={`listing_btn ${cat === "audio" ? "active" : ""}`}
					onClick={() => setCat("audio")}>
					Audios
				</button>
			</div>

			{cat === "image" ? (
				<div className="listing_display">
					{allImages?.length !== 0 &&
						allImages?.map((image) => (
							<div key={image?._id}>
								<h3>
									{" "}
									Caption: <span>{image?.caption}</span>
								</h3>

								<img
									src={
										import.meta.env.VITE_BASE_URL +
										"/upload/image/" +
										image?.filename
									}
									alt=""
									className="listing_img"
								/>
							</div>
						))}
				</div>
			) : cat === "video" ? (
				<div className="listing_display">
					{allVideos?.length !== 0 &&
						allVideos?.map((video) => (
							<div key={video?._id}>
								<h3>
									Caption: <span>{video?.caption}</span>
								</h3>
								<video
									src={
										import.meta.env.VITE_BASE_URL +
										"/upload/image/" +
										video?.filename
									}
									alt=""
									controls
									className="listing_vid"
								/>
							</div>
						))}
				</div>
			) : cat === "audio" ? (
				<div className="listing_display">
					{allAudios?.length !== 0 &&
						allAudios?.map((audio) => (
							<div key={audio?._id}>
								<h3>
									Caption: <span>{audio?.caption}</span>
								</h3>
								<audio
									src={
										import.meta.env.VITE_BASE_URL +
										"/upload/image/" +
										audio?.filename
									}
									alt=""
									controls
									className="listing_aud"
								/>
							</div>
						))}
				</div>
			) : (
				<div>Not Found</div>
			)}
		</div>
	);
}

export default ListingPage