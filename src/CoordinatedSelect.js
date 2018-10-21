import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

class CoordinatedSelect extends React.Component {
	constructor(props) {
		super(props);
		const startingDepth = props.selectValues.length - 1;
		this.state = {
			selectDepth: startingDepth,
		};
	}

	getKeyArray(depth) {
		const { selectValues, options } = this.props;
		const { selectDepth } = this.state;
		let obj = options;

		if (selectValues.length > 0) {
			// Step through each depth of the object, using `selectValues` as keys
			// until we've reached specified depth.
			for (let i = 0; i < depth; i++) {
				if (i > selectDepth) break;
				obj = obj[selectValues[i]];
			}
		}

		// If object is not an array, just grab the keys.
		if (!Array.isArray(obj)) {
			obj = Object.keys(obj);
		}

		return obj;
	}

	/* Handle select input change. Parameter `depth` indicates how much 
	'progress' the user has made in selections. If the user changes a select 
	that precedes another select, all following selects will be cleared / 
	reset / disabled depending on what's applicable. */
	onChange(depth, value) {
		let { selectValues } = this.props;

		// If selected value is none, it's the same as if the user changed the
		// select element a level up.
		if (!value) depth -= 1;

		// Update selectValues with user's selection.
		if (depth < selectValues.length) {
			if (value) selectValues[depth] = value;
			while(depth + 1 < selectValues.length) selectValues.pop();
		} else {
			selectValues.push(value);
		}

		this.setState({ selectDepth: depth });
		this.props.valueUpdater(selectValues);
	};

	createSelects() {
		let jsx = [];
		const { selectValues, nLevels, labels } = this.props;
		const { selectDepth } = this.state;

		for (let i = 0; i < nLevels; i++) {
			const thisIndex = i;
			const thisValue = selectValues[i] || '';
			const thisOptions = this.getKeyArray(i);
			const disabled = (i > selectDepth + 1);

			jsx.push(
				<Grid xs={3} key={i} item>
					<TextField
						fullWidth
						select
						disabled={disabled}
						value={thisValue}
						onChange={(e) => 
							this.onChange(thisIndex, e.target.value)}
						variant='standard'
						label={labels[i]}
					>
						<MenuItem value=''><em>None</em></MenuItem>
						{thisOptions.map(option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			);
		}

		return jsx;
	}

	render() {
		return (
			<Grid container spacing={24}>
				{ this.createSelects() }
			</Grid>
		);
	}
}

export default CoordinatedSelect;