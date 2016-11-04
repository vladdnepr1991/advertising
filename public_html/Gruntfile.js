module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			build: {
				files: {
					'css/test.css': 'css/test.less'
				}
			}
		},
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'dist/js/main.min.js': [
						'scripts/slider.js', 
						'scripts/screens.js', 
						'scripts/screenEffects.js', 
						'scripts/videoAdvertising.js', 
						'scripts/main.js'
						
					]
				}
			}
		},
		watch: {
			files: 'css/test.less',			
			tasks: ["less"]
		}	
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
};