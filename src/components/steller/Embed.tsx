import React, { useEffect } from 'react';

interface Props {
  story: any;
}

const StellerEmbed: React.FC<Props> = ({ story }) => {

  useEffect(() => {
    initializeSteller(story);

  }, [story]);

  return (
    <div>
      <style>
        {`
          .container {
            filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5));
            padding: 1em;
            background-color:transparent;
          }

          .container.desktop {
            width: 400px;
            aspect-ratio: 9 / 16;
          }

          .container.mobile {
            width: 500px;
            aspect-ratio: 9 / 16;
          }
        `}
      </style>
      <div className="container desktop"></div>
    </div>
  );
};

const initializeSteller = (story: any) => {

  var a_loaded = false;
  var b_loaded = false;
  
  const modernizrScript = document.createElement('script');
  modernizrScript.src = 'https://steller.co/site/static/js/modernizr.js';
  modernizrScript.async = true; 


  const embedScript = document.createElement('script');
  embedScript.src = 'https://steller.co/site/static/js/steller-story-embed.js';
  embedScript.async = true; 

  modernizrScript.onload = () => {
    a_loaded = true;

    if (a_loaded && b_loaded) {
      render(story);
    }
  }

  embedScript.onload = () => {
    b_loaded = true; 

    if (a_loaded && b_loaded) {
      render(story);
    }
  }

  document.body.appendChild(modernizrScript);
  document.body.appendChild(embedScript);
}

const render = (story: any) => {
    (window as any).steller.render(
      document.querySelector('.container.desktop'),
      story.share_url,
      {noMap: true}
    );
}

export default StellerEmbed;
