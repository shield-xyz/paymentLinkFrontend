const KYCVerification = async ({ isVerified }) => {
  console.log({ isVerified });
  // const isClient = useIsClient();

  // if (!isClient) {
  //   return (
  //     <Dialog>
  //       <DialogOverlay className="backdrop-blur-sm" />
  //     </Dialog>
  //   );
  // }

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-white backdrop-blur-sm">
      <iframe
        src="https://kyc-front-snowy.vercel.app/"
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default KYCVerification;
