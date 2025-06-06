import { useState } from "react";

type GithubMetricButtonProps = {
  count: number;
  name: string;
  textHREF: string;
  numHREF: string;
};

export default function GithubMetricButton({count, name, textHREF, numHREF}: GithubMetricButtonProps) {
  const [isHovered, setHovered] = useState(false);
  const [isCountHovered, setCountHovered] = useState(false);
  return(
    <span style={{overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '16px', fontWeight: '700', lineHeight: '22px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'}}>
      <a
        href={textHREF} rel="noopener noreferrer" target="_blank"
        style={{ 
          backgroundColor: isHovered ? '#ddd' : '#eee',
          backgroundImage: isHovered ? '' : 'linear-gradient(to bottom, #fcfcfc 0, #eee 100%)',
          backgroundRepeat: 'no-repeat',
          border: isHovered ? '1px solid #ccc' : '1px solid #d5d5d5',
          padding: '3px 10px 3px 8px',
          color: '#333',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          borderRadius: '3px',
          float: 'left',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{
          width: '20px',
          height: '20px',
          marginRight: '4px',
          float: 'left',
          background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='12 12 40 40'%3e%3cpath fill='%23333' d='M32 13.4c-10.5 0-19 8.5-19 19 0 8.4 5.5 15.5 13 18 1 .2 1.3-.4 1.3-.9v-3.2c-5.3 1.1-6.4-2.6-6.4-2.6-.9-2.1-2.1-2.7-2.1-2.7-1.7-1.2.1-1.1.1-1.1 1.9.1 2.9 2 2.9 2 1.7 2.9 4.5 2.1 5.5 1.6.2-1.2.7-2.1 1.2-2.6-4.2-.5-8.7-2.1-8.7-9.4 0-2.1.7-3.7 2-5.1-.2-.5-.8-2.4.2-5 0 0 1.6-.5 5.2 2 1.5-.4 3.1-.7 4.8-.7 1.6 0 3.3.2 4.7.7 3.6-2.4 5.2-2 5.2-2 1 2.6.4 4.6.2 5 1.2 1.3 2 3 2 5.1 0 7.3-4.5 8.9-8.7 9.4.7.6 1.3 1.7 1.3 3.5v5.2c0 .5.4 1.1 1.3.9 7.5-2.6 13-9.7 13-18.1 0-10.5-8.5-19-19-19z'/%3e%3c/svg%3e") no-repeat center / contain`
        }}/>
        {name}
      </a>
      <a
        href={numHREF} rel="noopener noreferrer" target="_blank"
        style={{
          position: 'relative',
          display: 'block',
          marginLeft: '6px',
          backgroundColor: '#fafafa',
          border: '1px solid #d4d4d4',
          padding: '3px 10px 3px 8px',
          color: isCountHovered ? '#0366d6' : '#333',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          borderRadius: '3px',
          float: 'left',
        }}
        onMouseEnter={() => setCountHovered(true)}
        onMouseLeave={() => setCountHovered(false)}
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
        {count}
      </a>
    </span>
  );
}