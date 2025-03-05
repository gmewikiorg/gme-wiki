export class ColorPicker {

    public static getColor(min: number, max: number, value: number, reverse: boolean = false) {
        if (value < 0) {
            return 'rgb(255, 8, 0)';
        }else{
            return this.getNonRedColor(min, max, value, reverse);
        }
        
    }
    public static getNonRedColor(min: number, max: number, value: number, reverse: boolean = false) {
        let scale = [
            'rgba(255, 167, 0, 1)',
            'rgba(169, 207, 0, 1)',
            'rgba(128, 202, 0, 1)',
            'rgba(44, 186, 0, 1)',
            'rgba(44, 186, 0, 1)'
        ];
        if (reverse === true) {
            scale = [
                'rgba(44, 186, 0, 1)',
                'rgba(44, 186, 0, 1)',
                'rgba(128, 202, 0, 1)',
                'rgba(169, 207, 0, 1)',
                'rgba(255, 167, 0, 1)',
            ];
        }
        const scales = scale.length;
        const range = max - min;
        const scaleSize = range / scales;
        const valueDiff = value - min;
        let valueScale = Math.round(valueDiff / scaleSize);
        valueScale--;
        if (valueScale < 0) {
            valueScale = 0;
        }
        if (value === 0) {
            return 'rgba(0,0,0,0)';
        }
        return scale[valueScale];
    }

    public static getNonRedBGColor(min: number, max: number, value: number, reverse: boolean = false) {
        let scale = [
            'rgba(255, 167, 0, 0.06)',
            'rgba(255, 244, 0, 0.06)',
            'rgba(163, 255, 0, 0.06)',
            'rgba(44, 186, 0, 0.06)',
            'rgba(44, 186, 0, 0.1)'
        ];
        if (reverse === true) {
            scale = [
                'rgba(44, 186, 0, 0.1)',
                'rgba(44, 186, 0, 0.06)',
                'rgba(163, 255, 0, 0.06)',
                'rgba(255, 244, 0, 0.06)',
                'rgba(255, 167, 0, 0.06)',
            ];
        }
        const scales = scale.length;
        const range = max - min;
        const scaleSize = range / scales;
        const valueDiff = value - min;
        let valueScale = Math.round(valueDiff / scaleSize);
        valueScale--;
        if (valueScale < 0) {
            valueScale = 0;
        }
        if (value === 0) {
            return 'rgba(0,0,0,0)';
        }
        return scale[valueScale];
    }

    public static setAlpha(rgbaString: string, newAlpha: number): string {
        // This regex will match both rgb(...) and rgba(...).
        // Capturing groups:
        //   1 => red
        //   2 => green
        //   3 => blue
        //   4 => alpha (if present)
        const regex = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/;

        const match = rgbaString.trim().match(regex);
        if (!match) {
            throw new Error('Invalid RGBA or RGB color string.');
        }

        // Destructure the captured groups.
        // "existingAlpha" may be undefined if it's just "rgb(...)".
        const [, r, g, b, existingAlpha] = match;

        // Return a proper "rgba(...)" string with the updated alpha.
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
    }


    public static getMinMax(values: number[]): { min: number, max: number } {
        let min = values[0];
        let max = 0;
        values.forEach(value => {
            if (value > max) {
                max = value;
            }
            if (value < min) {
                min = value;
            }
        });
        return { min: min, max: max };;
    }

    public static getColorZeroBased(value: number) {
        /**
         *  negative numbers: red
         *  zero: white
         *  positive numbers: green
         */
        if (value < 0) {
            return 'rgba(255, 0, 0, 0.09)';
        } else if (value === 0) {
            return 'rgb(255, 255, 255)';
        } else if (value > 0) {
            return 'rgba(44, 186, 0, 0.1)';
        }
        return 'rgb(255, 255, 255)';
    }

}