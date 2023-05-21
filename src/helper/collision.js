// let div1 = document.getElementById('div1').getBoundingClientRect();
// let div2 = document.getElementById('div2').getBoundingClientRect();

export default function collide(d1,d2) {
    return !(d1.right < d2.left || 
        d1.left > d2.right || 
        d1.bottom < d2.top || 
        d1.top > d2.bottom);
}

