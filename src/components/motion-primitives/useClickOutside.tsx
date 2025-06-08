import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void): void {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node;

			const isPortalDropdown = (target as HTMLElement)?.closest('[data-portal], [role="listbox"]');

			if (ref.current && !ref.current.contains(target) && !isPortalDropdown) {
				handler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, handler]);
}

export default useClickOutside;
