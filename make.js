var glob = require("glob"),
    fs = require('fs'),
    Handlebars = require('handlebars')


let useCaseFileList = glob.sync("use-cases/**", { nodir: true })
let polyfillsFileList = glob.sync("polyfills/*.js", { nodir: true })
let context = {
	useCases: []
}


useCaseFileList.forEach((file) => {
  	context.useCases.push(`\`${fs.readFileSync(file, 'utf8')}\``)
  }
)

let template = Handlebars.compile(`
	<html>
		<head>
			<title>Outline Tests</title>
			<script src="polyfills/{{polyfillId}}.js"></script>
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
					border: 1px dotted #777;
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
					border: 1px dotted #aaa;
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
					border: 1px dotted #ccc;
					border-left-style: solid;
					border-left-width: .50rem;
					padding-left: 1rem;
				}

				[outline-level] {
					border: 1px dashed rebeccapurple;
					margin: 1rem;
				}
			</style>
		</head>
		<body>
			<label>
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
					<li>Each outline section identifiable in the DOM is styled with a dashed purple border</li>
				</ul>
			</div>
			<textarea id="target-source" style="width: 100%; height: 50%">

			</textarea>
			<script>
				var useCases = [${context.useCases}]

				document.querySelector('#use-case-select').addEventListener(
					'change',
					function (evt) {
						var a = document.querySelector('#target-slot'),
							src = useCases[evt.target.options[evt.target.selectedIndex].value];
						a.innerHTML = src
						document.querySelector('#target-source').value = src;
					}
				)

			</script>
		</body>
	</html>
`)

polyfillsFileList.forEach((fileName) => {
	console.log(fileName)
	context.polyfillId = fileName.replace('polyfills/', '').replace('.js', '');

	fs.writeFileSync(`test-${context.polyfillId}.html`, template(context), 'utf8')
})

