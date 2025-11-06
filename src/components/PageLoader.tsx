import React, { memo } from 'react';

interface PageLoaderProps {
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = memo(({ className = '' }) => {
  return (
    <>
      <style>{`
        .page-loader {
          width: 64px;
          height: 48px;
          position: relative;
          animation: split 1s ease-in infinite alternate;
        }
        .page-loader::before, .page-loader::after {
          content: '';
          position: absolute;
          height: 48px;
          width: 48px;
          border-radius: 50%;
          left: 0;
          top: 0;
          transform: translateX(-10px);
          background: hsl(214 100% 50%);
          opacity: 0.85;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 20px hsl(214 100% 50% / 0.4);
        }
        .page-loader::after {
          left: auto;
          right: 0;
          background: hsl(270 85% 60%);
          transform: translateX(10px);
          box-shadow: 0 0 20px hsl(270 85% 60% / 0.4);
        }
        @keyframes split {
          0%, 25% { width: 64px }
          100% { width: 148px }
        }
      `}</style>
      <div className={`fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 ${className}`}>
        <div className="page-loader"></div>
      </div>
    </>
  );
});

PageLoader.displayName = 'PageLoader';

export default PageLoader;
