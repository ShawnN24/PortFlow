export default function HistoryContainer({githubData, themeColor, edit}) {
  return(
    <div className={`flex-1 p-3 ${edit ? `opacity-5` : `cursor-pointer drag-handle`}`}>
      <div className='flex items-center justify-center h-full'>
        <img src={`http://ghchart.rshah.org/${themeColor}/${githubData.login}`} className='w-full' />
      </div>
    </div>
  );
}