var glob = require("glob"),
    fs = require('fs'),
    Handlebars = require('handlebars')


let useCaseFileList = glob.sync("use-cases/**", { nodir: true })
let polyfillsFileList = glob.sync("polyfills/*.js", { nodir: true })
let context = {
	useCases: []
}

useCaseFileList.sort(function (as, bs) {
  let a = parseInt(as.match(/\d+/)[0], 10),
      b = parseInt(bs.match(/\d+/)[0], 10)
  if (a > b) { return 1; }
  if (b > a) { return -1; }
  return -0;
})

useCaseFileList.forEach((file) => {
  	context.useCases.push(`\`${fs.readFileSync(file, 'utf8')}\``)
  }
)

let template = Handlebars.compile(`
	<html>
		<head>
			<title>Outline Tests</title>
			{{#if polyfillId}}
				<script src="polyfills/{{polyfillId}}.js"></script>
			{{/if}}
			<style>
				h1,h2,h3,h4,h5,h6,[role='heading'] { font-style: italic; }

				h1,
				[role='heading'][aria-level='1'],
				h1[aria-level='1'],
				h2[aria-level='1'],
				h3[aria-level='1'],
				h4[aria-level='1'],
				h5[aria-level='1'],
				h6[aria-level='1']
				 {
					border: 1px dotted #000;
					border-left-style: solid;
					border-left-width: 1rem;
					padding-left: 1rem;
				}



				h2,
				[role='heading'][aria-level='2'],
				h1[aria-level='2'],
				h2[aria-level='2'],
				h3[aria-level='2'],
				h4[aria-level='2'],
				h5[aria-level='2'],
				h6[aria-level='2'] {
					border: 1px dotted #333;
					border-left-style: solid;
					border-left-width: .75rem;
					padding-left: 1rem;
				}

				h3,
				[role='heading'][aria-level='3'],
				h1[aria-level='3'],
				h2[aria-level='3'],
				h3[aria-level='3'],
				h4[aria-level='3'],
				h5[aria-level='3'],
				h6[aria-level='3'] {
					border: 1px dotted #777;
					border-left-style: solid;
					border-left-width: .50rem;
					padding-left: 1rem;
				}

				h4,
				[role='heading'][aria-level='4'],
				h1[aria-level='4'],
				h2[aria-level='4'],
				h3[aria-level='4'],
				h4[aria-level='4'],
				h5[aria-level='4'],
				h6[aria-level='4'] {
					border: 1px dotted #aaa;
					border-left-style: solid;
					border-left-width: .25rem;
					padding-left: 1rem;
				}

				h5,
				[role='heading'][aria-level='5'],
				h1[aria-level='5'],
				h2[aria-level='5'],
				h3[aria-level='5'],
				h4[aria-level='5'],
				h5[aria-level='5'],
				h6[aria-level='5'] {
					border: 1px dotted #ccc;
					border-left-style: solid;
					border-left-width: .25rem;
					padding-left: 1rem;
				}


				h6,
				[role='heading'][aria-level='6'],
				h1[aria-level='6'],
				h2[aria-level='6'],
				h3[aria-level='6'],
				h4[aria-level='6'],
				h5[aria-level='6'],
				h6[aria-level='6'] {
					border: 1px dotted #ccccff;
					border-left-style: solid;
					border-left-width: .15rem;
					padding-left: 1rem;
				}

				h1::after,
				h2::after,
				h3::after,
				h4::after,
				h5::after,
				h6::after,
				[aria-level]::after {
					font-size: 0.8rem;
				    color: white;
				    background-color: #090909;
				    vertical-align: top;
				    font-family: sans-serif;
				    margin: 0.25rem;
				    padding: 0.15rem .25rem;
				    font-style: normal;
				}

				h1::after,
				[role='heading'][aria-level='1']::after,
				h1[aria-level='1']::after,
				h2[aria-level='1']::after,
				h3[aria-level='1']::after,
				h4[aria-level='1']::after,
				h5[aria-level='1']::after,
				h6[aria-level='1']::after{
				    content: '1';

				}

				h2:after,
				[role='heading'][aria-level='2']::after,
				h1[aria-level='2']::after,
				h2[aria-level='2']::after,
				h3[aria-level='2']::after,
				h4[aria-level='2']::after,
				h5[aria-level='2']::after,
				h6[aria-level='2']::after{
					content: '2';
					background-color: #7d03b8;
				}

				h3::after,
				[role='heading'][aria-level='3']::after,
				h1[aria-level='3']::after,
				h2[aria-level='3']::after,
				h3[aria-level='3']::after,
				h4[aria-level='3']::after,
				h5[aria-level='3']::after,
				h6[aria-level='3']::after{
					content: '3';
					background-color: #068b73;
				}

				h4::after,
				[role='heading'][aria-level='4']::after,
				h1[aria-level='4']::after,
				h2[aria-level='4']::after,
				h3[aria-level='4']::after,
				h4[aria-level='4']::after,
				h5[aria-level='4']::after,
				h6[aria-level='4']::after{
					content: '4';
					background-color: #a20404;
				}

				h5::after,
				[role='heading'][aria-level='5']::after,
				h1[aria-level='5']::after,
				h2[aria-level='5']::after,
				h3[aria-level='5']::after,
				h4[aria-level='5']::after,
				h5[aria-level='5']::after,
				h6[aria-level='5']::after{
					content: '5';
					background-color: #9e6b0d;
				}

				h6::after,
				[role='heading'][aria-level='6']::after,
				h1[aria-level='6']::after,
				h2[aria-level='6']::after,
				h3[aria-level='6']::after,
				h4[aria-level='6']::after,
				h5[aria-level='6']::after,
				h6[aria-level='6']::after{
					content: '6';
					background-color: #1258c5;
				}

				[outline-level] {
					border: 1px dashed rebeccapurple;
					margin: 1rem;
				}
			</style>
		</head>
		<body>
			<label style="display: none;">
				Load use case:
				<select id="use-case-select">
					<option>None</option>
					{{#each useCases}}
						<option value="{{@index}}">{{@index}}</option>
					{{/each}}
				</select>
			</label>
			<div id="target-slot">
				<ul>
					<li>Anything with a role of heading is italicized</li>
					<li>Each outline-level is styled with dotted border and different width marker</li>
					<li>The effective heading level is shown a superscript <code>::after</code> flag</li>
					<li>Each outline section identifiable in the DOM is styled with a dashed purple border</li>
				</ul>
			</div>
			<textarea id="target-source" style="display: none; width: 100%; height: 50%;">

			</textarea>
			<script>
				var useCases = [${context.useCases}]

				var useCaseSelect = document.querySelector('#use-case-select'),
					setUseCase = function (i) {
						var a = document.querySelector('#target-slot'),
							src = useCases[i];
						a.innerHTML = src
						document.querySelector('#target-source').value = src;
					};

				useCaseSelect.addEventListener(
					'change',
					function (evt) {
						var ucNum = evt.target.options[evt.target.selectedIndex].value;
						if (!isNaN(ucNum)) {
							setUseCase(ucNum);
						} else {
							document.querySelector('#target-slot').innerHTML = ''
							document.querySelector('#target-source').value = ''
						}
					}
				)

				window.onhashchange = function () {
					var ucNum = parseInt(window.location.hash.replace("#",""),10);
					useCaseSelect.selectedIndex = 1 + ucNum
					if (!isNaN(ucNum)) {
						setUseCase(useCaseSelect.options[useCaseSelect.selectedIndex].value )
					}
				}

				if (window.location.hash) {
					window.onhashchange();
				}


			</script>
		</body>
	</html>
`)

polyfillsFileList.unshift("")
polyfillsFileList.forEach((fileName) => {
	console.log(fileName)
	context.polyfillId = fileName.replace('polyfills/', '').replace('.js', '');

	fs.writeFileSync(`test-${context.polyfillId}.html`, template(context), 'utf8')
})

