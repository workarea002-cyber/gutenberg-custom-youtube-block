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
import {
	TextControl,
	PanelBody,
	Button,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
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
	const {
		youtubeData,
		customImage,
		isCustomImage,
		imgAspectRatio,
		videoAspectRatio,
	} = attributes;

	console.log("logging attributes", attributes);

	// Get the Id from the youtube URl
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

	// Setting the different image size for select dropdown
	const sizeOptions = Object.entries(customImage?.sizes || {}).map(
		([key, data]) => ({
			label: `${key} (${data.width} x ${data.height})`,
			value: key,
		}),
	);

	const handleLinkInput = (newLink) => {
		//check if link is new
		if (youtubeLink !== newLink) {
			setAttributes({
				youtubeData: {
					...youtubeData,
					url: newLink,
				},
			});

			const videoId = getYouTubeID(newLink);

			if (id) {
				setAttributes({
					youtubeData: {
						...youtubeData,
						id: videoId,
						thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
					},
				});
			}
		}
	};

	const blockProps = useBlockProps({
		style: {
			"--img-aspect-ratio": imgAspectRatio,
			"--video-aspect-ratio": videoAspectRatio,
		},
		"data-youtube-id": youtubeData.id,
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title="YouTube Settings">
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="YouTube URL"
						value={youtubeData.url}
						onChange={(newLink) => handleLinkInput(newLink)}
						placeholder="Enter YouTube URL"
					/>
				</PanelBody>

				<PanelBody title="Custom Thumbnail">
					<ToggleControl
						__nextHasNoMarginBottom
						label="Custom Thumbnail"
						checked={isCustomImage}
						onChange={(newValue) => {
							setAttributes({
								isCustomImage: newValue,
							});
						}}
					/>
					{isCustomImage && (
						<>
							<MediaUpload
								title="Select Image"
								allowedTypes={["image/jpeg", "image/png", "image/webp"]}
								value={customImage.id}
								onSelect={(image) => {
									setAttributes({
										customImage: {
											id: image.id,
											url: image.url,
											alt: image.alt,
											sizes: image.sizes,
											selectedSize: "full",
										},
									});
								}}
								render={({ open }) => {
									if (0 == customImage.id) {
										return (
											<Button
												className="components-button is-primary"
												onClick={open}
											>
												Select Image
											</Button>
										);
									} else {
										return (
											<>
												<img src={customImage.url} onClick={open} />
												<Button
													className="components-button is-secondary"
													onClick={() =>
														setAttributes({
															customImage: {
																id: 0,
																url: "",
																alt: "",
																sizes: {},
																selectedSize: "full",
															},
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

							<SelectControl
								label="Image Size"
								value={customImage.selectedSize}
								options={sizeOptions}
								onChange={(newSize) => {
									const sizeData = customImage?.sizes?.[newSize];
									if (sizeData) {
										setAttributes({
											customImage: {
												...customImage,
												url: customImage.sizes[newSize].url,
												selectedSize: newSize,
											},
										});
									}
								}}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title="Video Dimension">
					<SelectControl
						label="Image Aspect Ratio"
						value={imgAspectRatio}
						options={[
							{ label: "Default - 16/9", value: "16/9" },
							{ label: "Standard - 4/3", value: "4/3" },
							{ label: "Portrait - 3/4", value: "3/4" },
							{ label: "Classic - 3/2", value: "3/2" },
							{ label: "Classic Portrait - 2/3", value: "2/3" },
							{ label: "Tall - 9/16", value: "9/16" },
							{ label: "Square - 1/1", value: "1/1" },
						]}
						onChange={(newRatio) => setAttributes({ aspectRatio: newRatio })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>

					<SelectControl
						label="Video Aspect Ratio"
						value={videoAspectRatio}
						options={[
							{ label: "Default - 16/9", value: "16/9" },
							{ label: "Standard - 4/3", value: "4/3" },
							{ label: "Portrait - 3/4", value: "3/4" },
							{ label: "Classic - 3/2", value: "3/2" },
							{ label: "Classic Portrait - 2/3", value: "2/3" },
							{ label: "Tall - 9/16", value: "9/16" },
							{ label: "Square - 1/1", value: "1/1" },
						]}
						onChange={(newRatio) =>
							setAttributes({ videoAspectRatio: newRatio })
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<figure>
				<img
					className="thumb"
					src={isCustomImage ? customImage.url : youtubeData.thumbnail}
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
