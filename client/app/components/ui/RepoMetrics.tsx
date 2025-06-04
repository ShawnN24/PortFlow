import React, { useEffect, useState } from 'react';

export default function RepoMetrics() {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isViewsHovered, setViewsHovered] = useState(false);
  const [isViewsCountHovered, setViewsCountHovered] = useState(false);

  useEffect(() => {
    fetch("https://github-traffic-api.onrender.com/traffic/PortFlow", {
      method: "GET",
      headers: {
        "github-traffic-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setViewCount(data.total_views); // or data.total_uniques
      })
      .catch(() => {
        setViewCount(null);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center mt-4" style={{ transform: "scale(1.5)" }}>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=ShawnN24&repo=PortFlow&type=star&count=true"
          width="100"
          height="20"
          title="GitHub"
        ></iframe>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=ShawnN24&repo=PortFlow&type=fork&count=true"
          width="100"
          height="20"
          title="Fork on GitHub"
        ></iframe>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=ShawnN24&type=follow&count=true"
          width="170"
          height="20"
          title="Follow on GitHub"
        ></iframe>
        <span style={{ width: '100px', overflow: 'hidden', fontSize: '11px', fontWeight: '700', lineHeight: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'}}>
          <a
            href={`https://github.com/ShawnN24/PortFlow`} rel="noopener noreferrer" target="_blank"
            style={{ 
              backgroundColor: isViewsHovered ? '#ddd' : '#eee',
              backgroundImage: isViewsHovered ? '' : 'linear-gradient(to bottom, #fcfcfc 0, #eee 100%)',
              backgroundRepeat: 'no-repeat',
              border: isViewsHovered ? '1px solid #ccc' : '1px solid #d5d5d5',
              padding: '2px 5px 2px 4px',
              color: '#333',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              borderRadius: '3px',
              float: 'left',
             }}
             onMouseEnter={() => setViewsHovered(true)}
             onMouseLeave={() => setViewsHovered(false)}
          >
            <span style={{
              width: '14px',
              height: '14px',
              marginRight: '4px',
              float: 'left',
              background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='12 12 40 40'%3e%3cpath fill='%23333' d='M32 13.4c-10.5 0-19 8.5-19 19 0 8.4 5.5 15.5 13 18 1 .2 1.3-.4 1.3-.9v-3.2c-5.3 1.1-6.4-2.6-6.4-2.6-.9-2.1-2.1-2.7-2.1-2.7-1.7-1.2.1-1.1.1-1.1 1.9.1 2.9 2 2.9 2 1.7 2.9 4.5 2.1 5.5 1.6.2-1.2.7-2.1 1.2-2.6-4.2-.5-8.7-2.1-8.7-9.4 0-2.1.7-3.7 2-5.1-.2-.5-.8-2.4.2-5 0 0 1.6-.5 5.2 2 1.5-.4 3.1-.7 4.8-.7 1.6 0 3.3.2 4.7.7 3.6-2.4 5.2-2 5.2-2 1 2.6.4 4.6.2 5 1.2 1.3 2 3 2 5.1 0 7.3-4.5 8.9-8.7 9.4.7.6 1.3 1.7 1.3 3.5v5.2c0 .5.4 1.1 1.3.9 7.5-2.6 13-9.7 13-18.1 0-10.5-8.5-19-19-19z'/%3e%3c/svg%3e") no-repeat center / contain`
            }}/>
            Views
          </a>
          <a
            href={'https://github.com/ShawnN24/PortFlow'} rel="noopener noreferrer" target="_blank"
            style={{
              position: 'relative',
              display: 'block',
              marginLeft: '4px',
              backgroundColor: '#fafafa',
              border: '1px solid #d4d4d4',
              padding: '2px 5px 2px 4px',
              color: isViewsCountHovered ? '#0366d6' : '#333',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              borderRadius: '3px',
              float: 'left',
            }}
            onMouseEnter={() => setViewsCountHovered(true)}
            onMouseLeave={() => setViewsCountHovered(false)}
          >
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '-5px',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: '5px solid #d4d4d4',
                zIndex: 0,
              }}
            />
            <span
              style={{
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '-3px',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: '4px solid #fafafa',
              }}
            />
            {viewCount}
          </a>
        </span>
      </div>
    </div>
  );
}