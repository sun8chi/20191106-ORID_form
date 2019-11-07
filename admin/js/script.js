//取消表單點擊預設行為
const form = document.querySelector('form');
form.addEventListener(
	'submit',
	function (e) {
		e.preventDefault();
	},
);

// google 機器人驗證
// grecaptcha.ready(function () {
// 	grecaptcha.execute('6LdGz78UAAAAAD6K2raruEUQnSY11kcEsg2Ng-_X', {
// 		action: 'social'
// 	}).then(function (token) {
// 		console.log(token);

// 		const tokenId = token;
// 		const xhr = new XMLHttpRequest(); //前端傳給後端的方法
// 		xhr.open("POST", "Verification.ashx");
// 		xhr.setRequestHeader("Content-Type", "application/json");
// 		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 要用 x-www-form-urlencoded (類似MIME)方式傳送
// 		xhr.onload = function () {
// 			console.log('hiddenToken');
// 			const res = this.responseText;
// 			console.log(this.responseText);
// 		};
// 		xhr.send(`hiddenToken=${tokenId}`);
// 	});
// });
// 顯示所有人名
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://orid.rocket-coding.com/EveryPartners.ashx');
xhr.onload = function () {
	const res = JSON.parse(this.responseText);
	const name = document.querySelector('#name');
	name.innerHTML = `<option disabled selected hidden>請選擇</option>`;
	res.forEach(item => {
		name.innerHTML += `<option value="${item.Name}">${item.Name}</option>`;
	});
	// name.addEventListener('change', getMondayTarget, false);
};
xhr.send();

// 選日期、人名 出現週一
let today = new Date();
today = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
let dateInput = document.querySelector('#searchDate');
dateInput.value = today;

function getMondayTarget() {
	const searchName = document.querySelector('#name option:checked').value;
	const searchDate = dateInput.value;
	var data = `date=${searchDate}%2F7%2F7&name=${searchName}`;

	var xhr = new XMLHttpRequest();
	// xhr.addEventListener("readystatechange", function () {
	// 	if (this.readyState === 4) {
	// 		console.log(this.responseText);
	// 	}
	// });
	xhr.onload = function () {
		const res = this.responseText;
		console.log(res);
		// if(res[1] !== ''){
		// 	document.querySelector('.targetBox').innerHTML = `
		// 		<label for="">【週一填寫】您本週的目標是？</label>
		// 		<div class="target">${res[1]}</div>
		// 	`;
		// };
	};
	console.log(data);
	xhr.open("GET", "https://orid.rocket-coding.com/CheckAndTarget.ashx");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.withCredentials = false;
	xhr.setRequestHeader("Accept", "*/*");
	xhr.setRequestHeader("Cache-Control", "no-cache");


	xhr.send(data);
};

//進度條
const progress = document.querySelectorAll('.form__progress span');
const progressInput = document.querySelectorAll('.form__progress input');
progress.forEach((item, i) => {
	item.addEventListener('click', function (e) {
		progress.forEach((item) => item.classList.remove('active'));
		let degress = parseInt(e.target.value);
		for (let num = 0; num < i + 1; num++) {
			progress[num].classList.add('active');
		}
		document.querySelector('.degree em').style.width = `${degress-5}%`;
	}, false)
});


// 編輯器
let editorArry = ['process', 'sentiment', 'comprehension', 'strive', 'Friday'];
editorArry.forEach(item => CKEDITOR.replace(item));

//要 post 的資料： date, name, target, reach, mood, process, sentiment, comprehension, strive,Friday

//驗證表單
const btn = document.querySelector('.form__btn');
btn.addEventListener('click', checkForm, false);

function checkForm() {
	// const date = document.querySelector('#date').value;
	const name = document.querySelector('#name').value; // 姓名
	const target = CKEDITOR.instances.editor.getData(); // 週一
	const reach = document.querySelector('input[name="ok"]:checked').value; // 完成度
	const mood = document.querySelector('input[name="mood"]:checked').value; // 心情
	const process = CKEDITOR.instances.process.getData(); // 學習歷程
	const sentiment = CKEDITOR.instances.sentiment.getData(); // 心情寫照
	const comprehension = CKEDITOR.instances.comprehension.getData(); // 每日獲得
	const strive = CKEDITOR.instances.strive.getData(); // 明日行動
	const Friday = CKEDITOR.instances.Friday.getData(); // 週五填寫

	// console.log(1, name);
	// console.log(2, target);
	// console.log(3, reach);
	// console.log(4, mood);
	// console.log(5, process);
	// console.log(6, sentiment);
	// console.log(7, comprehension);
	// console.log(8, strive);
	// console.log(9, Friday);
	let sendData = {};

	// 驗證表單不是空值
	// if (num == 0 && emailCheck != '-1' && isPdf == 'pdf' && checkNum != '0') {
	// 	sendForm();
	// }
	sendForm()
}

//傳送表單
function sendForm() {
	console.log('傳表單囉');
	var data = "date=2019%2F10%2F15&name=Chita&target=%E8%BF%BD%E5%8A%87&reach=%E6%99%AE%E9%80%9A&mood=40%25&process=%E7%84%A1&sentiment=%E7%84%A1&comprehension=%E7%84%A1&strive=%E7%84%A1&Friday=%E7%84%A1";
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://orid.rocket-coding.com/CreateORID.ashx');
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.withCredentials = false;
	xhr.onload = function () {
		const res = this.responseText;
		console.log(res);
		const form = document.querySelector('.form');
		if (res == '成功!') {
			//表單成功內容
			form.innerHTML = `
			<div class="sendResult ">
				<div class="firework animated tada">
		            <img class="firework01" src="admin/img/icon_star02.png" alt="">
		            <img class="firework02" src="admin/img/icon_star01.png" alt="">
		        </div>
		        <h2 class="animated bounceIn">YA!本日表單送出成功</h2>
				<p>加油加油～</p>
		    </div>`;
			document.querySelector('.rocket').style.animationName = 'rocket_fly';
			document.querySelector('.rocket').style.position = 'absolute';
		} else {
			//表單失敗
			form.innerHTML = `
			<div class="sendResult ">
				<div class="animated tada icon_cry">
					<img class="firework01" src="admin/img/cry.png" alt="">
				</div>
				<h2 class="animated bounceIn">嗚嗚～表單送出失敗</h2>
				<p>${res}</p>
			</div>
			<a href="index.html" class="form__btn">重新填寫</a>
		`;
		}
	};
	xhr.send(data);
}


// 日曆
$(document).ready(function () {
	let startDate = new Date('2019/07/01');
	$(function () {
		$('#searchDate').datepicker({
			dateFormat: "yyyy/mm/dd",
			setDate: 0,
			language: 'zh',
			maxDate: new Date(),
			minDate: startDate,
			onSelect: function (date) {
				// let thisDate = new Date(date).toLocaleString().split(" ")[0];
				// showDate(date);
				// getMondayTarget()
				// console.log('切換日曆嚕');
			}
		});
	});
});