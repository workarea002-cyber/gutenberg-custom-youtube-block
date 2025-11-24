/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
document.addEventListener("DOMContentLoaded", () => {
	const ytBlocks = document.querySelectorAll(
		".wp-block-create-block-lite-youtube",
	);

	ytBlocks.forEach((block) => {
		const overlay = block.querySelector(".overlay");
		const id = block.dataset.youtubeId;
		let isIframeLoaded = false;

		overlay.addEventListener("click", (e) => {
			e.stopPropagation();
			if (isIframeLoaded) return;
			isIframeLoaded = true;

			const iframe = document.createElement("iframe");
			iframe.src = `https://www.youtube.com/embed/${id}?feature=oembed`;
			iframe.width = "560";
			iframe.height = "315";
			iframe.style.width = "auto";
			iframe.title = "YouTube video player";
			iframe.frameBorder = "0";
			iframe.allow =
				"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
			iframe.allowFullscreen = true;

			block.querySelector("figure").replaceWith(iframe);
		});
	});
});
/* eslint-enable no-console */
