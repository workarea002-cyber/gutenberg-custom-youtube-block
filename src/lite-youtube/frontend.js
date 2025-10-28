document.addEventListener("DOMContentLoaded", () => {
	const ytBlocks = document.querySelectorAll(
		".wp-block-create-block-lite-youtube",
	);

	ytBlocks.forEach((block) => {
		const overlay = block.querySelector(".overlay");
		const id = block.dataset.youtubeId;
		let isIframeLoaded = false;

		overlay.addEventListener("click", () => {
			if (isIframeLoaded) return;
			isIframeLoaded = true;

			const iframe = document.createElement("iframe");
			iframe.src = `https://www.youtube.com/embed/${id}?feature=oembed`;
			iframe.width = "560";
			iframe.height = "315";
			iframe.style.height = "auto";
			iframe.style.aspectRatio = "16 / 9";
			iframe.title = "YouTube video player";
			iframe.frameBorder = "0";
			iframe.allow =
				"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
			iframe.allowFullscreen = true;

			block.querySelector("figure").replaceWith(iframe);
		});
	});
});
