
fn main(){
    let x = 5;
    let raw = &x as *const i32;

    let mut y = 10;
    let raw_mut = &mut y as *mut i32;
    println!("Hello world")
}
