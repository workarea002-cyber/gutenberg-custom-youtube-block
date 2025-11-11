/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from "@wordpress/block-editor";
import { TextControl, PanelBody, Button } from "@wordpress/components";
import play from "../assets/icons-play.png";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { youtubeLink, thumbnail, youtubeVideoID, customImage, isCustomImage } =
		attributes;

	const getYouTubeID = (url) => {
		try {
			const match = url.match(
				/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
			);
			return match ? match[1] : "";
		} catch {
			return "";
		}
	};

	const handleLinkInput = (value) => {
		const id = getYouTubeID(value);
		if (id) {
			setAttributes({
				youtubeVideoID: id,
				youtubeLink: value,
				thumbnail: isCustomImage
					? customImage.url
					: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
				isClicked: false,
			});
		}
	};

	return (
		<div {...useBlockProps()} data-youtube-id={youtubeVideoID}>
			<InspectorControls>
				<PanelBody title="YouTube Settings">
					<TextControl
						label="YouTube URL"
						value={youtubeLink}
						onChange={handleLinkInput}
						placeholder="https://www.youtube.com/watch?v=abc-123"
					/>
				</PanelBody>
				<PanelBody title="Custom Image">
					<MediaUpload
						title="Select Image"
						allowedTypes={["image/jpeg", "image/png", "image/webp"]}
						value={customImage.id}
						onSelect={(image) =>
							setAttributes({
								isCustomImage: true,
								customImage: { id: image.id, url: image.url, alt: image.alt },
							})
						}
						render={({ open }) => {
							if (0 == customImage.id) {
								return <Button onClick={open}>Select Image</Button>;
							} else {
								return (
									<>
										<img src={customImage.url} onClick={open} />
										<Button
											onClick={() =>
												setAttributes({
													isCustomImage: false,
													customImage: { id: 0, url: "", alt: "" },
												})
											}
										>
											Delete Image
										</Button>
									</>
								);
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<figure>
				<img
					src={isCustomImage ? customImage.url : thumbnail}
					alt="Youtube Thumbnail"
				/>
				<div
					className="overlay"
					onClick={() => setAttributes({ isClicked: true })}
				>
					<img src={play} alt="icon" width={64} height={64} />
				</div>
			</figure>
		</div>
	);
}
