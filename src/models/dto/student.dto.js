export function toCreateStudentDto(body) {
    const { name, email, age } = body ?? {};
    if (!name || !email || typeof age !== "number") {
        throw new Error ('Paylod incorrecto');
    }; 
    return { name, email, age };
} 

export function toUpdateStudentDto(body) {
    const out = {};
    if(!body?.name) out.name = body.name;
    if(!body?.email) out.email = body.email;
    if(typeof body?.age === "number") out.age = body.age;
    return out;
}