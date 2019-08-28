var here = document.querySelector('#here');
var tagForm = document.querySelector('form');
var tagInput = tagForm.querySelector('[name="Search"]');
var tagButton = tagForm.querySelector('button');

tagButton.onclick = function(e){
	e.preventDefault();
	here.innerHTML = '';
	var request = tagInput.value;
	tagForm.reset();
	var api =  'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBrmaj7j0yIJGWcGPYH3THz_Rh8BYAtlQs&q=' + request + '&type=video';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', api);
	xhr.onload = function renderHtml(){
		var data = JSON.parse(xhr.response);
		var videoId = data.items[0].id.videoId;
		function renderVideo(id){
			callback(id);
			data.items.forEach(function (item,index){
				var tagDivMiniImg = document.createElement('div');
				var tagImg = document.createElement('img');
				var urlImg = item.snippet.thumbnails.medium.url;
				tagImg.setAttribute('src', urlImg);
				tagImg.setAttribute('width', '100%');
				tagImg.setAttribute('height', '100%');
				tagDivMiniImg.appendChild(tagImg);
				tagDivMiniImg.classList.add('float');
				tagDivMiniImg.style.width = '20%'
				tagDivMiniImg.style.height = '20%'
				here.appendChild(tagDivMiniImg);
				tagDivMiniImg.onclick = function(){
					here.innerHTML = '';
					var newVideoId = item.id.videoId;
					renderVideo(newVideoId);
				}
			})
		}
		renderVideo(videoId)
	}
	xhr.send();
}

function callback (videoId){
	var tagDivVideo = document.createElement('div');
	tagDivVideo.innerHTML = '<iframe width="100%" height="533" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
	here.appendChild(tagDivVideo);
}