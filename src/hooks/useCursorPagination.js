import { useCallback, useState } from "react"

export const useCursorPagination = () => {
    const [cursor, setCursor] = useState(null);
    const [cursorHistory, setCursorHistory] = useState([])
    const nextPage = useCallback((nextCursor) => {
        if (!nextCursor) return
        setCursorHistory((prev) => [...prev, cursor])
        setCursor(nextCursor);
    }, [cursor])
    const previousPage = useCallback(() => {
        if (cursorHistory.length === 0) return;
        const previousCursorValue = cursorHistory[cursorHistory.length - 1];
        const updatedHistory = cursorHistory.slice(0, -1);
        setCursor(previousCursorValue);
        setCursorHistory(updatedHistory)
    }, [cursorHistory]);
    const resetPagination = useCallback(() => {
        setCursor(null);
        setCursorHistory([]);
    }, []);

    return {
        cursor,
        hasPreviousPage: cursorHistory.length > 0,
        nextPage,
        previousPage,
        resetPagination,
    };
}