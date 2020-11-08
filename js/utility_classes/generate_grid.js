function getWidth() {
	return Math.min(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	);
}

function getHeight() {
	return Math.min(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.documentElement.clientHeight
	);
}

function generate_grid() {
	grid.innerHTML = '';
	column_width = getWidth();
	column_height = getHeight();
	box_no = Math.floor(column_width / 30);
	box_no2 = Math.floor(column_height / 30);
	// console.log(box_no);
	// console.log(box_no2);
	box_no -= 7;
	box_no2 -= 5;
	for (let i = 0; i < grid.children.length; i++) {
		grid.children[i].remove();
	}
	for (let i = 0; i < box_no2; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < box_no; j++) {
			let div = document.createElement('td');
			div.style.width = '30px';
			div.style.height = '30px';
			div.background = 'white';
			div.style.border = '1px solid white';
			div.classList.add('cell');
			tr.appendChild(div);
		}
		grid.appendChild(tr);
	}

	cell = document.querySelectorAll('.cell');
	cell[box_no].innerHTML =
		"<i class='fas fa-hand-point-right fa-2x' style='color:white'>";
	cell[box_no].classList.add('src');
	cell[box_no2].innerHTML =
		"<i class='fas fa-hand-lizard fa-2x' style='color:white'>";
	cell[box_no2].classList.add('end');

	// console.log(cell);
	let p = box_no;
	let isdrawing = false;
	for (let i = 0; i < cell.length; i++) {
		cell[i].addEventListener('mousedown', function (e) {
			if (cell[i].innerHTML === '') {
				cell[i].style.background = 'teal';
				isdrawing = true;
				cell[i].classList.add('obst');
			}
		});
		cell[i].addEventListener('mousemove', function (e) {
			if (cell[i].innerHTML === '' && isdrawing == true) {
				cell[i].style.background = 'teal';
				isdrawing = true;
				cell[i].classList.add('obst');
			}
		});

		cell[i].addEventListener('mouseup', function (e) {
			isdrawing = false;
		});
		cell[i].addEventListener('click', function (e) {
			cell[i].style.background = document.body.background;
			cell[i].classList.add('src');
			cell[box_no].innerHTML = '';
			cell[i].innerHTML =
				"<i class='fas fa-hand-point-right src fa-2x' style='color:white'>";

			cell[p].innerHTML = '';
			cell[i].classList.remove('obst');
			cell[p].classList.remove('obst');
			// cell[box_no].classList.remove("obst");
			// cell[p].classList.add("obst");
			cell[p].classList.remove('src');
			p = i;
		});
	}
}
