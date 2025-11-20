/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import play from "../assets/icons-play.png";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const {
		thumbnail,
		youtubeVideoID,
		customImage,
		isCustomImage,
		imgAspectRatio,
		videoAspectRatio,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			"--img-aspect-ratio": imgAspectRatio,
			"--video-aspect-ratio": videoAspectRatio,
		},
	});

	return (
		<>
			<div {...blockProps} data-youtube-id={youtubeVideoID}>
				<figure>
					<img
						className="thumb"
						src={isCustomImage ? customImage.url : thumbnail}
						alt="Youtube Thumbnail"
						loading="lazy"
						fetchPriority="low"
						decoding="async"
					/>
					<div className="overlay">
						<img
							loading="lazy"
							fetchPriority="low"
							decoding="async"
							src={play}
							alt="icon"
							width={64}
							height={64}
						/>
					</div>
				</figure>
			</div>
		</>
	);
}
