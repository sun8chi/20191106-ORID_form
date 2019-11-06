// loader
const loader = document.querySelector('.loader');
window.onload = function () {
	loader.classList.add('hide');
};
// setTimeout(function(){
// 	loader.classList.add('hide');
// },2000);

// google 機器人驗證
grecaptcha.ready(function () {
	grecaptcha
		.execute('6Lf6pL0UAAAAAPo6jQwDUh0xSSafY0FPoTt86qRL', {
			action: 'social'
		})
		.then(function (token) {
			document.getElementById('hiddenToken').value = token;
			const tokenId = document.getElementById('hiddenToken').value;
			const xhr = new XMLHttpRequest();
			xhr.open('POST', 'verification.ashx');
			// xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 要用 x-www-form-urlencoded 方式傳送
			xhr.onload = function () {
				const res = this.responseText;
			};
			xhr.send(`hiddenToken=${tokenId}`);
		});
});

//取消表單點擊預設行為
const form = document.querySelector('form');
form.addEventListener(
	'submit',
	function (e) {
		e.preventDefault();
	},
	false
);

//驗證表單
const btn = document.querySelector('.form__btn');
btn.addEventListener('click', checkForm, false);

function checkForm() {
	//驗證 checkbox
	let classDate = document.querySelectorAll('.classDate');
	let checkNum = 0;
	classDate.forEach((element) => {
		if (element.checked == true) {
			checkNum += 1;
		}
	});
	if (checkNum == 0) {
		classDate.forEach((element) => element.classList.add('classDate--notice'));
	}
	setTimeout(function () {
		classDate.forEach((element) => element.classList.remove('classDate--notice'));
	}, 3000);
	if (checkNum == '0') {
		classDate[0].setCustomValidity('請至少選擇一個梯次哦！');
	}else {
		classDate[0].setCustomValidity('');
	}

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const tel = document.querySelector('#tel').value;
	const pdf = document.getElementById('pdf');
	const introduction = document.querySelector('#introduction').value;
	const why = document.querySelector('#why').value;
	const essay = document.querySelector('#essay').value;
	let isPdf = pdf.files[0].type.split('/')[1];

	if (num == 0 && emailCheck != '-1' && isPdf == 'pdf' && checkNum != '0') {
		// sendForm();
	}
}

//傳送表單
function sendForm() {
	//表單資訊
	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const tel = document.querySelector('#tel').value;
	const pdf = document.getElementById('pdf');
	const introduction = document.querySelector('#introduction').value;
	const why = document.querySelector('#why').value;
	const essay = document.querySelector('#essay').value;
	//取得組別
	const classType = document.querySelectorAll('.classType');
	let myClass;
	classType.forEach((element) => {
		if (element.checked == true) {
			myClass = element.value;
		}
	});
	// 取得梯次
	const classDate = document.querySelectorAll('.classDate');
	let myDate = [];
	classDate.forEach((element) => {
		if (element.checked == true) {
			myDate.push(element.value);
		}
	});
	myDate = myDate.join();

	// formData
	let postForm = new FormData();
	postForm.append('name', name);
	postForm.append('email', email);
	postForm.append('tel', tel);
	postForm.append('pdf', pdf.files[0]);
	postForm.append('introduction', introduction);
	postForm.append('why', why);
	postForm.append('essay', essay);
	postForm.append('joingroup', myClass);
	postForm.append('batch', myDate);

	//xhr 送資料
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'registform.ashx');
	xhr.onload = function () {
		const res = this.responseText;
		const form = document.querySelector('.form');
		if (res == 'success') {
			// 表單成功內容
			form.innerHTML = `
			<div class="sendResult ">
				<div class="firework animated tada">
                    <img class="firework01" src="img/icon_star02.png" alt="">
                    <img class="firework02" src="img/icon_star01.png" alt="">
                </div>
                <h2 class="animated bounceIn">YA!表單送出成功</h2>
                <p>我們收到您的報名資訊後，<br />會再進行審核，並挑選第一波面試名單，<br />經面試後審核沒問題，<br />符合資格便可加入火箭隊培訓營囉！</p>
            </div>`;
			document.querySelector('.rocket').style.animationName = 'rocket_fly';
			document.querySelector('.rocket').style.position = 'absolute';
		} else {
			// 表單失敗
			form.innerHTML = `
			<div class="sendResult ">
				<div class="animated tada icon_cry">
					<img class="firework01" src="img/cry.png" alt="">
				</div>
				<h2 class="animated bounceIn">嗚嗚～表單送出失敗</h2>
				<p>${res}</p>
			</div>
			<a href="index.html" class="form__btn">重新填寫</a>
        `;
		}
	};
	xhr.send(postForm);
}