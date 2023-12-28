function MainBox({ theme }: { theme: () => string }) {
  return (
    <div class="w-full mt-20 flex items-center justify-center z-10 relative">
      <div class="bg-background rounded-md w-1/2 h-28"></div>
    </div>
  );
}

export { MainBox };
