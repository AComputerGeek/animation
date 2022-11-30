// buttons
const start = document.getElementById(`btn-start`);
const stop  = document.getElementById(`btn-stop`);
const back  = document.getElementById(`btn-back`);
const next  = document.getElementById(`btn-next`);
const reset = document.getElementById(`reset`);

// main image
const mainImage = document.querySelector("#main-image");

// pop up
const popup = document.getElementById(`pop-up`);
const close = document.getElementById(`close-pop-up`);

const popupDelay  = 3000;
const fadeInDelay = 1000;
let   popupHandler;

/* 
--------------------------
Animation (Start and Stop)
--------------------------
*/
let   imageNumber     = 1;
const startPoint      = 1;
const limit           = 34;
const animatedBack    = 2;
let   hasStarted      = false;
let   hasStopped      = false;
const animationSlower = 100;
let   animationHandler;

const entryTime = Date.now();

start.addEventListener(`click`, function()
{
    // pop up should be deactivate, if "Start Animation" button pushed less than 3 second after landing to the page
    const timer = Date.now() - entryTime;

    if(timer < popupDelay)
    {
        clearTimeout(popupHandler);
    }

    // start button hasn't pushed yet
    if(!hasStarted)
    {
        requestAnimationFrame(move);
        hasStarted = true;
    }
});

function move()
{
    if(imageNumber >= startPoint && imageNumber <= limit)
    {
        mainImage.src = `images/bike-${imageNumber}.jpg`;
        imageNumber++;

        if(imageNumber > limit)
        {
            imageNumber = startPoint;
        }
    }

    // make animation slower by using setTimeout for calling back the requestAnimationFrame(move)
    animationHandler = setTimeout(function()
    {
        requestAnimationFrame(move);
    }, animationSlower);
}

stop.addEventListener(`click`, function()
{
    if(hasStarted)
    {
        clearTimeout(animationHandler);
        hasStarted = false;
        hasStopped = true;
    }
});

/* 
------------------
Back Slide ( <-- )
------------------
*/
back.addEventListener(`click`, function()
{
    // pop up should be deactivate, if "<--" button pushed less than 3 second after landing to the page
    const timer = Date.now() - entryTime;

    if(timer < popupDelay)
    {
        clearTimeout(popupHandler);
    }

    if(!hasStopped) // animation hasn't started yet
    {
        if(imageNumber > startPoint)
        {
            imageNumber--;
            mainImage.src = `images/bike-${imageNumber}.jpg`;              
        }
        else
        {
            imageNumber   = limit;
            mainImage.src = `images/bike-${imageNumber}.jpg`; 
        }
    }
    else // animation has started, but stopped
    {
        if(imageNumber > startPoint)
        {
            imageNumber   -= animatedBack;
            mainImage.src = `images/bike-${imageNumber}.jpg`;   
            hasStopped    = false;
        }
        else
        {
            imageNumber   = limit;
            mainImage.src = `images/bike-${imageNumber}.jpg`; 
            hasStopped    = false;
        }
    }
});

/* 
------------------
Next Slide ( --> )
------------------
*/
next.addEventListener(`click`, function()
{
    // pop up should be deactivate, if "-->" button pushed less than 3 second after landing to the page
    const timer = Date.now() - entryTime;

    if(timer < popupDelay)
    {
        clearTimeout(popupHandler);
    }

    if(!hasStopped) // animation hasn't started yet
    {
        if(imageNumber < limit)
        {
            imageNumber++;
            mainImage.src = `images/bike-${imageNumber}.jpg`;                        
        }
        else
        {
            imageNumber   = startPoint;
            mainImage.src = `images/bike-${imageNumber}.jpg`;             
        }
    }
    else // animation has started, but stopped
    {
        if(imageNumber < limit)
        {
            mainImage.src = `images/bike-${imageNumber}.jpg`; 
            imageNumber++;
        }
        else
        {            
            mainImage.src = `images/bike-${imageNumber}.jpg`; 
            imageNumber   = startPoint;
        }
    }
});

/* 
-----
Reset
-----
*/
reset.addEventListener(`click`, function()
{
    clearTimeout(animationHandler);
    hasStarted    = false;
    imageNumber   = startPoint;
    mainImage.src = `images/bike-${imageNumber}.jpg`; 
});

/* 
------
Pop up 
------
*/
popupHandler = setTimeout(function()
{
    popup.style.display = `block`;

    // fade in the pop up
    setTimeout(function()
    {
        popup.style.opacity = 1;
    }, fadeInDelay);
}, popupDelay);

close.addEventListener(`click`, function(event)
{
    popup.style.display = `none`;

    // another way to fade out (or close) the pop up
    // popup.style.opacity = 0;
});
