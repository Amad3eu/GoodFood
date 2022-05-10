<div class="card">
<img src="./beach.jpg" alt="" class="card-image"> <h4 class="card-title">The beach</h4>
</div>
.card{
width: 150px;
height: 200px;
outline: 1px solid
background-color: #333;
 border-radius: 10px; 
rgba(255, 255, 255,.5); outline-offset: -8px; box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
 position: relative;
  overflow: hidden; }
.card-image{
position: absolute;
 inset: 0; 
 width: 100%; 
 height: 100%;
  object-fit: cover; 
 transition: transform .75s; 
opacity: .6;}

.card:hover .card-image{ transform: scale (1.15);
}
.card-title{
left: 15px;
position: absolute; 
bottom: 15px;
 font-size: 20px; 
 text-shadow: 0 0 1px
}
rgba(e, 0, 0, .5);