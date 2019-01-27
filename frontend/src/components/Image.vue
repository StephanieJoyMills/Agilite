<template>
<v-app>
    <navigation/>
    <v-content>
			<v-container >
                <v-flex>
                    <span style=" line-height: 80px; font-family: TypoPRO Bebas Neue; font-size: 40px;">Image Upload</span><br>
                    <v-text>Insert image to upload template data to agilite. Our computer vision algorithms will recognize the different sticky's and 
                        populate the board accordingly. 
                    </v-text>
                </v-flex>
                
				<v-flex xs12 md10 class="text-xs-center text-sm-center text-md-center text-lg-center" style="padding: 50px;">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
                <v-flex md2 class="justify-center">
                    <v-btn class="primary" v-on:click="board()">Submit</v-btn>
                </v-flex>
			</v-container>
		</v-content>
</v-app>
</template>

<script>
import Navigation from "./Navigation";
export default {
    name: 'Image',
    data: () => ({
            title: "Image Upload",
            dialog: false,
            imageName: '',
            imageUrl: '',
            imageFile: ''
    }),
    components: {
        navigation: Navigation,
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        
        board () {
            this.$router.push('/board');
        }
    }
}

</script>