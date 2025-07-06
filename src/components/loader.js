function Loading(parent, isLoading = true) {
	const isExist = parent.querySelector(".loader-overlay");
	if (isExist) {
		isExist.remove();
	}

	if (!isLoading) {
		parent.style.zIndex = "auto";
		return;
	}

	const loader = document.createElement("div");
	loader.className = "loader-overlay flex items-center justify-center";
	loader.innerHTML = '<div class="loader"></div>';

	if (parent.style.position !== "relative") {
		parent.style.position = "relative";
	}

	parent.appendChild(loader);
	parent.style.zIndex = "-1";
}

export { Loading };
