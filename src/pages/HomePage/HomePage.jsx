import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import "./HomePage.css"
import {  useNavigate } from 'react-router-dom';

function HomePage() {

  const [avatarfile, setAvatarFile] = useState();
	const [caption, setCaption] = useState("");
	const fileRef = useRef();

	const [recentlyUpload, setRecentlyUpload] = useState();

	const navigate = useNavigate();

	const FetchRecentUpload = async () => {
		try {
			const res = await axios
				.get(import.meta.env.VITE_BASE_URL + "/upload/recent/")
				.then((res) => {
					return res.data;
				});

			setRecentlyUpload(res);

			// console.log(res)
		} catch (error) {
			console.log("FetchRecentUpload error: " + error);
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();

		if (!caption.trim() || !avatarfile.name) {
			return alert("Please enter a caption or upload the photo");
		} else {
			let formData = new FormData();
			formData.append("file", avatarfile);
			formData.append("caption", caption);
			// console.log(formData.get("file"));
			// console.log(formData.get("caption"));

			// console.log(formData)

			try {
				await axios.post(import.meta.env.VITE_BASE_URL + "/upload/", formData);

				await FetchRecentUpload();
				// console.log(res.data)

				setAvatarFile();
				setCaption("");
				fileRef.current.value = "";
			} catch (error) {
				console.log("handleUpload error:" + error);
			}
		}
	};

	// useEffect(() => {
	// 	console.log("recentlyUpload", recentlyUpload?.image);
	// }, [recentlyUpload]);
  return (
		<div className='container'>
			<form onSubmit={handleUpload}>
				<input
					type="file"
					ref={fileRef}
					onChange={(e) => setAvatarFile(e.target.files[0])}
				/>

				<input
					type="text"
					placeholder="Your photo caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
				/>

				<button type="submit">Upload</button>
			</form>

			{recentlyUpload && (
				<div className="recently_box">
					<p>Caption: {recentlyUpload?.image?.caption}</p>
					{recentlyUpload?.image?.contentType === "image/jpeg" ||
					recentlyUpload?.image?.contentType === "image/png" ||
					recentlyUpload?.image?.contentType === "image/svg" ? (
						<img
							src={
								import.meta.env.VITE_BASE_URL +
								"/upload/image/" +
								recentlyUpload?.image?.filename
							}
							alt=""
							className="recent_img"
						/>
					) : recentlyUpload?.image?.contentType === "video/mp4" ? (
						<video
							src={
								import.meta.env.VITE_BASE_URL +
								"/upload/image/" +
								recentlyUpload?.image?.filename
							}
							className="recent_img"
							controls
						/>
					) : recentlyUpload?.image?.contentType === "audio/mpeg" ? (
						<audio
							src={
								import.meta.env.VITE_BASE_URL +
								"/upload/image/" +
								recentlyUpload?.image?.filename
							}
							className="recent_audio"
							controls
						/>
					) : (
						<div>Not Found</div>
					)}
				</div>
			)}

			<button className='go_list_btn' onClick={()=>{navigate("/list")}}>Check all the Files</button>
		</div>
	);
}

export default HomePage