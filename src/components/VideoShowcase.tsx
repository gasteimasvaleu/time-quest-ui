const VideoShowcase = () => {
  return (
    <section className="w-full bg-background px-4 py-4 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
          <div className="aspect-video w-full overflow-hidden rounded-2xl">
            <video
              src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0406%20(1).mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
