import { Loading } from "./components/loader";

const API_KEY = import.meta.env.VITE_APP_API_KEY; // add your api key

// min and max length for generating random text types
const MIN_LENGTH = 1;
const MAX_COUNT = 10;

const params = {
	genType: "paragraph",
	lang: "persian",
	count: 1,
};

const buttons = document.querySelector(".buttons");
const genType = document.querySelector(".gen-type");
const langSelect = document.querySelector(".lang-select");
const countValue = document.querySelector(".count-value");

const copyBtn = document.querySelector(".btn-copy");
const generateBtn = document.getElementById("generate");
const resetBtn = document.getElementById("reset");

const result = document.querySelector(".result");
const para = result.querySelector(".para").cloneNode(true);
const paraText = para.textContent;

buttons.addEventListener("click", (e) => setButton(e));

// get witch button is clicked and set new data on params object
function setButton(e) {
	const validTarget = e.target.closest(".btn");

	if (!validTarget) return;
	const targetIndex = validTarget.dataset.index;
	const targetValue = validTarget.dataset.value;

	if (targetIndex == 0) {
		genType.querySelector(".active") ? genType.querySelector(".active").classList.remove("active") : "";
		params.genType = targetValue;
	}

	if (targetIndex == 1) {
		langSelect.querySelector(".active") ? langSelect.querySelector(".active").classList.remove("active") : "";
		validTarget.dataset.value == "english" ? result.classList.add("en") : result.classList.remove("en");
		params.lang = targetValue;
	}

	if (targetIndex == 3) {
		validTarget.ariaLabel == "increase" ? increase() : reduce();
	}

	targetIndex == 3 || targetIndex == 2 ? "" : validTarget.classList.add("active");
}

// increase generate random text count
function increase() {
	if (params.count == MAX_COUNT) {
		return;
	}

	params.count++;
	countValue.textContent = params.count;
}

// reduce generate random text count
function reduce() {
	if (params.count == MIN_LENGTH) {
		return;
	}

	params.count--;
	countValue.textContent = params.count;
}

generateBtn.addEventListener("click", generateText);

// generate random text with gemini
async function generateText() {
	generateBtn.classList.add("generating");
	generateBtn.textContent = "در حال تولید...";

	Loading(result, true);

	try {
		// add url key here
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
		// edit prompt if you want
		const prompt = `
            Generate ${params.count} ${params.genType}s of placeholder text in ${params.lang}. 
            Make sure the text looks realistic but has no real meaning (like lorem ipsum). 
            Separate each ${params.genType} with (n) keyword. Do not include explanations.
            Only return the generated text.
            `;

		// fetch data
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
			}),
		});

		if (!response.ok) {
			console.log(response.status);
			console.log("failed to get data");
		}

		const text = await response.json();

		const output = text.candidates[0].content.parts[0].text;

		result.innerHTML = "";

		// if text generator type is selected on 'word' do not create paragraph element
		if (params.genType !== "word") {
			output.split("(n)").forEach((item) => {
				const para = document.createElement("p");
				para.className = "para";
				para.textContent = item;
				result.appendChild(para);
			});
		} else {
			result.innerHTML = output.split("(n)").join(" ");
		}
	} catch (error) {
		console.log(error);
	} finally {
		// reset generate button to default
		generateBtn.classList.remove("generating");
		generateBtn.textContent = "تولید";
	}
}

copyBtn.addEventListener("click", copyGeneratedText);

// copy generated text handler
async function copyGeneratedText() {
	try {
		copyBtn.textContent = "کپی شد!";
		copyBtn.classList.add("success");
		await navigator.clipboard.writeText(result.textContent);
	} catch (error) {
		console.log(error);
	}

	setTimeout(() => {
		copyBtn.textContent = "کپی متن";
		copyBtn.classList.remove("success");
	}, 2000);
}

resetBtn.addEventListener("click", resetToDefault);

// reset all values to default handler
function resetToDefault() {
	params.genType = "paragraph";
	params.lang = "persian";
	params.count = 1;
	countValue.textContent = 1;
	buttons.querySelector('[data-value="paragraph"]').click();
	langSelect.querySelector('[data-value="persian"]').click();
	result.innerHTML = `<p class="para">${paraText}</p>`;
}
