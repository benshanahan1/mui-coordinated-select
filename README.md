# ReactJS Material-UI coordinated TextFields demo

Demo of coordinated Material-UI TextField components in ReactJS!

![Demo GIF](./demo.gif)


## Demo

`cd` into the project folder and run:

```bash
npm install
npm start
```

## Usage

The component in the above animated GIF is written like so:

```jsx
<CoordinatedSelect
	options={OPTIONS}
	labels={LABELS}
	nLevels={N_LEVELS}
	variant='standard'
	spacing={24}
	xsBreakpoint={3}
	selectValues={this.state.selectValues}
	valueUpdater={this.updateSelectValues.bind(this)}
/>
```

Where `OPTIONS`, `LABELS`, and `N_LEVELS` are defined as follows:

```js
const LABELS = ['First level', 'Second level', 'Third level', 'Fourth level'];
const N_LEVELS = 4;
const OPTIONS = {
	numbers: {
		one: {
			'1': ['111','222','333'],
			'2': ['222','444','666'],
			'3': ['333','666','999'],
		},
		two: {
			'2': ['222','444','666'],
			'4': ['444','888','121212'],
			'6': ['666','121212','181818'],
		},
		three: {
			'3': ['333','666','999'],
			'6': ['666','121212','181818'],
			'9': ['999','181818','272727'],
		},
	},
	letters: {
		a: {
			'a': ['aaa','bbb','ccc'],
			'A': ['AAA','BBB','CCC'],
		},
		e: {
			'e': ['eee','fff','ggg'],
			'E': ['EEE','FFF','GGG'],
		},
		s: {
			's': ['sss','ttt','uuu'],
			'S': ['SSS','TTT','UUU'],
		},
	},
};
```