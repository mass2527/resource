function App() {
  return (
    <div className="min-h-screen flex">
      <aside className="max-w-sm w-full flex flex-col border-r">
        <div className="h-14 border-b p-2 flex gap-2 justify-between">
          <button type="button" className="w-full border rounded">
            URL 추가
          </button>

          <button type="button" className="w-full border rounded">
            이미지 추가
          </button>
        </div>

        <div className="flex flex-col gap-2 p-2 flex-1">
          <div className="border rounded-lg p-3 flex flex-col">
            <div className="line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              omnis natus alias aut. Fuga consequatur dicta cupiditate repellat
              quis porro officiis nulla tempora non ad voluptate, repellendus
              exercitationem, sit incidunt!
            </div>

            <div className="flex justify-end gap-2">edit trash</div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <div className="h-14 border-b p-2 flex justify-between items-center">
          <p>
            https://lallalalaallaaalalaaalalaaalaaaldkdfsalalaalalkfajlkflajflkajskdjflajsdlfkjasdfasd...
          </p>
          <button type="button">cancel</button>
        </div>
      </div>
    </div>
  );
}

export default App;
