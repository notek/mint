// 地址格式化
export function addressCut(addr: string, len = 5, place = '...'): string {
    if (addr) return addr.slice(0, len) + place + addr.slice(-len)
    return '-'
}